export const isPendingOrRejectedAction = (action) => {
    return action.type.endsWith("/rejected") || action.type.endsWith("/pending");
  }
  
 export const handlePendingAndRejected = (state, action) => {
    if (action.type.endsWith("/pending")) {
      state.loading = true
      state.error = null
    } else if (action.type.endsWith("/rejected")) {
      state.loading = false
      state.error = action.error.message
    }
  };