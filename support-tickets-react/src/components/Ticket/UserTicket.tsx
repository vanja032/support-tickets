import "../../assets/style/Ticket/UserTickets.css";

interface Props {
  ticket: Ticket;
}

const UserTicket = (props: Props) => {
  return (
    <div className="col-12 col-lg-6 p-4">
      <div
        className={
          "bg-custom4 rounded p-2 px-4" +
          (props.ticket.status == "pending"
            ? " warning-border ticket-border"
            : props.ticket.status == "closed"
            ? " valid-border ticket-border"
            : "")
        }
      >
        <div className="col-12 p-2 color-custom2 ticket-header">
          {props.ticket.subject}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-body">
          {<span className="color-custom2">Message: </span>}{" "}
          {props.ticket.message}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-props">
          {<span className="color-custom2">Created: </span>}{" "}
          {props.ticket.created}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-props">
          {<span className="color-custom2">Tags: </span>}{" "}
          {props.ticket.tags && props.ticket.tags.length
            ? props.ticket.tags
            : "No tags present"}
        </div>
        {props.ticket.response ? (
          <div className="col-12 p-2 color-custom1 ticket-props">
            {<span className="color-custom2">Answer: </span>}{" "}
            {props.ticket.response}
          </div>
        ) : (
          <></>
        )}
        {props.ticket.response ? (
          <div className="col-12 p-2 color-custom1 ticket-props">
            {<span className="color-custom2">Responded by: </span>}{" "}
            {props.ticket.response_by}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserTicket;
