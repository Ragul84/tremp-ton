import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import { useCounterContract } from '../hooks/useCounterContract';
import useWindowSize from 'react-use/lib/useWindowSize';
import toast, { Toaster } from 'react-hot-toast';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [votes, setVotes] = useState(() => {
    const savedVotes = JSON.parse(localStorage.getItem('votes'));
    return savedVotes || {};
  });
  const navigate = useNavigate();
  const { sendIncrement } = useCounterContract();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.geckoterminal.com/api/v2/networks/ton/tokens/multi/EQBwHOvf3UrPPJB7jeDHaOT-2vP0QQlDoEDBsgfv5XF75J3j%2CEQBZ_cafPyDr5KUTs0aNxh0ZTDhkpEZONmLJA2SNGlLm4Cko%2CEQCFWfg1ELLRkNQ1VgxCEOYKqLqxAuNJTrUXFXgkag7D2ssH%2CEQBng_Ux8DLKeaLZ4kN4eec-U-SJ1fMtYvqQANtL0oxKRQh_%2CEQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO%2CEQAX9J60va-0wIDMdqGLRMf7imJvG0Ytyi3Yxnq9y-nbNCq2%2CEQD36Lxp6p4FMzHQThWzvFNaqhbT8Qip4rMF1NYjCSgY6ksE%2CEQA6Q3dMgVEfXQ9tNBL2fMljEhI_azQ-R3vvPgjGOXwoF7kt%2CEQC47093oX5Xhb0xuk2lCr2RhS8rj-vul61u4W2UH5ORmG_O'
        );
        const coinsData = response.data.data.map(coin => ({
          id: coin.id,
          ...coin.attributes,
        }));
        setCoins(coinsData);
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (coinId) => {
    const now = new Date();
    const lastVoteTime = votes[coinId]?.timestamp ? new Date(votes[coinId].timestamp) : null;

    if (!lastVoteTime || now - lastVoteTime >= 86400000) {
      sendIncrement(coinId)
        .then(() => {
          setVotes(prevVotes => ({
            ...prevVotes,
            [coinId]: {
              count: (prevVotes[coinId]?.count || 0) + 1,
              timestamp: new Date().toISOString(), 
            },
          }));
          toast.success('Vote registered successfully!');
        })
        .catch(error => {
          console.error('Transaction failed:', error);
          toast.error('Transaction failed. Please try again later.');
        });
    } else {
      toast.error('You can only vote once per day.');
    }
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="px-4 py-8 bg-gray-800 rounded-lg shadow-md">
      <Toaster />
      <h1 className="text-3xl font-bold text
-center text-white mb-6">
        Discover promising tokens vetted thoroughly on the TON ecosystem.
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search For A Coin..."
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-lg rounded-lg p-3 w-full max-w-xl text-gray-700"
        />
      </div>
      {loading ? (
        <div className="h-2 bg-blue-400 rounded-full animate-pulse"></div>
      ) : (
        <>
          <div className="overflow-x-auto   rounded-lg">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-black">
                <tr className='me-2' >
                  {['Coin', 'Price', 'Volume', 'Market Cap', 'Vote', 'Votes'].map((head) => (
                    <th key={head} className="py-3 me-2 px-2">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-700">
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((coin) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-gray-600 cursor-pointer"
                      onClick={() => navigate(`/coins/${coin.id}`)}
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={coin.image_url}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-white">
                           {coin.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        ${parseFloat(coin.price_usd).toFixed(4)}
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        {coin.volume_usd?.h24
                          ? `$${numberWithCommas(
                              parseFloat(coin.volume_usd.h24).toFixed(3)
                            )}`
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        ${numberWithCommas(coin.fdv_usd)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <FaRocket
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(coin.id);
                          }}
                          className="text-white cursor-pointer text-xl"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-white">
                        {votes[coin.id]?.count || 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="btn btn-primary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <h2 className="text-2xl mt-3 text-white font-bold">
            Want To Get Your Project Listed?
          </h2>
          <p className="text-gray-500 text-xs mt-2">
            Get in touch with us, and once we've thoroughly researched your
            project and are confident in its safety for users, it will be
            listed.
          </p>
        </>
      )}
    </div>
  );
}

export default CoinsTable;
