import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboardData } from './hooks/useDashboardData';
import { useFriendActions } from './hooks/useFriendActions';
import DashboardHeader from './components/DashboardHeader';
import StatsCardsSection from './components/StatsCardsSection';
import MatchHistorySection from './components/MatchHistorySection';
import TabNavigation from './components/TabNavigation';
import UsersTab from './components/UsersTab';
import FriendRequestsTab from './components/FriendRequestsTab';
import FriendsTab from './components/FriendsTab';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const {
    stats,
    userData,
    allUsers,
    friends,
    receivedRequests,
    sentRequests,
    computerGames,
    loading,
    error,
    loadDashboardData
  } = useDashboardData(user);

  const {
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleCancelFriendRequest,
    handleUnfriend,
    handleChallengeFriend
  } = useFriendActions(user, loadDashboardData);

  const handleChallenge = (friendUserId) => {
    handleChallengeFriend(friendUserId, navigate);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gaming Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dashboardGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboardGrid)" />
        </svg>
      </div>

      {/* Animated Glow Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader onRefresh={loadDashboardData} />
        <StatsCardsSection stats={stats} userData={userData} />
        <MatchHistorySection computerGames={computerGames} />
        
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          receivedRequestsCount={receivedRequests.length}
        />

        <motion.div
          key={activeTab}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        >
          {activeTab === 'users' && (
            <UsersTab
              allUsers={allUsers}
              friends={friends}
              sentRequests={sentRequests}
              receivedRequests={receivedRequests}
              onSendRequest={handleSendFriendRequest}
              onAcceptRequest={handleAcceptFriendRequest}
              onRejectRequest={handleRejectFriendRequest}
              onCancelRequest={handleCancelFriendRequest}
            />
          )}

          {activeTab === 'requests' && (
            <FriendRequestsTab
              receivedRequests={receivedRequests}
              onAcceptRequest={handleAcceptFriendRequest}
              onRejectRequest={handleRejectFriendRequest}
            />
          )}

          {activeTab === 'friends' && (
            <FriendsTab
              friends={friends}
              onChallenge={handleChallenge}
              onUnfriend={handleUnfriend}
            />
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
