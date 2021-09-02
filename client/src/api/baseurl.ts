export const baseurl =
  process.env.NODE_ENV === 'development'
    ? '/patients'
    : `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_IBASE}/hs/${process.env.REACT_APP_API_NAME}/patients`;
