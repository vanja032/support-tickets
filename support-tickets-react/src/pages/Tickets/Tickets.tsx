import { useContext, useEffect, useState } from "react";
import Ticket from "../../components/Ticket/Ticket";
import { BiLoaderAlt } from "react-icons/bi";
import { UserContext } from "../../context/UserContext/UserContext";
import axios from "axios";

const Tickets = () => {
  const { user, defaultApi } = useContext(UserContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const FetchTickets = async () => {
    try {
      const data = {
        token: user.token,
      };

      const result = await axios.post(`${defaultApi}/get_tickets`, data);
      if (result && Object.keys(result.data.body.tickets).length > 0) {
        const tickets_tmp: Ticket[] = [];
        for (const user in result.data.body.tickets) {
          for (const ticket in result.data.body.tickets[user].tickets) {
            tickets_tmp.push({
              subject: result.data.body.tickets[user].tickets[ticket].subject,
              message: result.data.body.tickets[user].tickets[ticket].message,
              description:
                result.data.body.tickets[user].tickets[ticket].description,
              status: result.data.body.tickets[user].tickets[ticket].status,
              response: result.data.body.tickets[user].tickets[ticket].response,
              response_by:
                result.data.body.tickets[user].tickets[ticket].response_by,
              open: result.data.body.tickets[user].tickets[ticket].open,
              created: result.data.body.tickets[user].tickets[ticket].created,
              tags: result.data.body.tickets[user].tickets[ticket].tags,
              username: result.data.body.tickets[user].username,
              f_name: result.data.body.tickets[user].f_name,
              l_name: result.data.body.tickets[user].l_name,
              email: result.data.body.tickets[user].email,
              user_ticket_id: parseInt(ticket),
            } as Ticket);
          }
        }
        setTickets(tickets_tmp);
        setLoading(false);
        return true;
      } else {
        setTickets([]);
        setLoading(false);
        return false;
      }
    } catch (error) {
      setTickets([]);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    FetchTickets();
  }, [user]);

  return (
    <div className="row m-4 p-4">
      {loading ? (
        <div className="col-12 color-custom2 d-flex justify-content-center my-2">
          <BiLoaderAlt className="form-loader-tickets" />
        </div>
      ) : tickets.length > 0 ? (
        <>
          <div className="row col-12 m-2">
            <button
              className="mr-4 my-2 p-2 rounded-lg ticket-response"
              onClick={() => {
                setCategory("all");
              }}
            >
              All tickets
            </button>
            <button
              className="mr-4 my-2 p-2 rounded-lg ticket-response"
              onClick={() => {
                setCategory("pending");
              }}
            >
              Pending tickets
            </button>
            <button
              className="mr-4 my-2 p-2 rounded-lg ticket-response"
              onClick={() => {
                setCategory("closed");
              }}
            >
              Closed tickets
            </button>
          </div>
          {tickets.map((ticket, key) => {
            return category == "all" || ticket.status == category ? (
              <Ticket
                key={key}
                ticket={ticket}
                ticket_id={ticket.user_ticket_id}
              />
            ) : (
              <></>
            );
          })}
        </>
      ) : (
        <span className="color-custom2">There are no tickets</span>
      )}
    </div>
  );
};

export default Tickets;
