import { apiService } from '../../../services/api';
import socketService from '../../../services/socketService';

export const useFriendActions = (user, loadDashboardData) => {
  const handleSendFriendRequest = async (targetUserId) => {
    try {
      await apiService.sendFriendRequest(targetUserId);
      socketService.sendFriendRequestNotification(user.uid, targetUserId);
      await loadDashboardData();
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert(error.message || 'Failed to send friend request');
    }
  };

  const handleAcceptFriendRequest = async (requesterUserId) => {
    try {
      await apiService.acceptFriendRequest(requesterUserId);
      socketService.sendFriendRequestResponseNotification(user.uid, requesterUserId, 'accept');
      await loadDashboardData();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert(error.message || 'Failed to accept friend request');
    }
  };

  const handleRejectFriendRequest = async (requesterUserId) => {
    try {
      await apiService.rejectFriendRequest(requesterUserId);
      socketService.sendFriendRequestResponseNotification(user.uid, requesterUserId, 'reject');
      await loadDashboardData();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert(error.message || 'Failed to reject friend request');
    }
  };

  const handleCancelFriendRequest = async (targetUserId) => {
    try {
      await apiService.cancelFriendRequest(targetUserId);
      await loadDashboardData();
    } catch (error) {
      console.error('Error cancelling friend request:', error);
      alert(error.message || 'Failed to cancel friend request');
    }
  };

  const handleUnfriend = async (friendUserId) => {
    try {
      if (confirm('Are you sure you want to remove this friend?')) {
        await apiService.unfriend(friendUserId);
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Error unfriending:', error);
      alert(error.message || 'Failed to remove friend');
    }
  };

  const handleChallengeFriend = (friendUserId, navigate) => {
    socketService.sendGameChallengeNotification(user.uid, friendUserId, `game-${Date.now()}`);
    navigate(`/game/multiplayer/${friendUserId}`);
  };

  return {
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleCancelFriendRequest,
    handleUnfriend,
    handleChallengeFriend
  };
};

