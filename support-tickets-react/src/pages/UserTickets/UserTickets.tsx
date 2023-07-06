import { useContext } from "react";
import UserTicket from "../../components/Ticket/UserTicket";
import { UserContext } from "../../context/UserContext/UserContext";

const UserTickets = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="row m-4 p-4">
      {user.tickets && user.tickets.length > 0 ? (
        user.tickets.map((ticket, id) => {
          return <UserTicket key={id} ticket={ticket} />;
        })
      ) : (
        <span className="color-custom2">
          There are no tickets for this user
        </span>
      )}
    </div>
  );
};

export default UserTickets;
