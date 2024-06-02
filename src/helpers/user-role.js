const isAdmin = (userId) => {
  return +userId === 1;
};

export const getUserRoles = (currentUserId) => {
  const isAuthenticatedUser = !!currentUserId;
  const isAdminUser = isAdmin(currentUserId);

  return { isAuthenticatedUser, isAdminUser, currentUserId };
};
