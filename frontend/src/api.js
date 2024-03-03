export const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxZWE4ZGU2My0zZTdiLTQ3OTctOTM1OC0xMzIwZmIxMTgwNzUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwOTUwNjk1OSwiZXhwIjoxNzA5NTkzMzU5fQ.UDUfWObWCRUB0wZtPZ24Q0pf_F47gPeozGBYqeZ_AdE";

export const createNewRoom = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const { roomId } = await res.json();
  return roomId;
};