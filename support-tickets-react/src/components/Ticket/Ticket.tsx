import { useContext, useState } from "react";
import "../../assets/style/Ticket/Tickets.css";
import { FiEdit2 } from "react-icons/fi";
import { MdCloseFullscreen } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { UserContext } from "../../context/UserContext/UserContext";
import axios from "axios";

interface Props {
  ticket: Ticket;
  ticket_id?: number;
}

const Ticket = (props: Props) => {
  const { user, defaultApi } = useContext(UserContext);
  const [respond, setRespond] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const [status, setStatus] = useState(props.ticket.status);
  const [open, setOpen] = useState(props.ticket.open);
  const [ticketResponse, setTicketResponse] = useState(props.ticket.response);
  const [ticketResponseBy, setTicketResponseBy] = useState(
    props.ticket.response_by
  );

  const Respond = async () => {
    try {
      const data = {
        user: props.ticket.username,
        email: props.ticket.email,
        ticket_id: props.ticket_id,
        token: user.token,
        response: response,
      };

      const result = await axios.post(`${defaultApi}/ticket_response`, data);
      if (result && result.data.body.status) {
        setSuccess(true);
        setMessage("Successfully responded to user ticket");
        setResponse("");
        if (
          result.data.body.result.ticket_status != undefined &&
          result.data.body.result.open != undefined &&
          result.data.body.result.response != undefined &&
          result.data.body.result.response_by != undefined
        ) {
          setStatus(result.data.body.result.ticket_status);
          setOpen(result.data.body.result.open);
          setTicketResponse(result.data.body.result.response);
          setTicketResponseBy(result.data.body.result.response_by);
        }
        setLoading(false);
        return true;
      } else {
        setSuccess(false);
        setMessage("Ticket response failed");
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setMessage("Ticket response failed");
      setLoading(false);
      return false;
    }
  };

  return (
    <div className="col-12 col-lg-6 p-4">
      <div
        className={
          "bg-custom4 rounded p-2 px-4" +
          (status == "pending"
            ? " warning-border ticket-border"
            : status == "closed"
            ? " valid-border ticket-border"
            : " invalid-border ticket-border")
        }
      >
        <div className="col-12 p-2 color-custom2 ticket-header">
          {props.ticket.subject}{" "}
          {status == "pending" && open == true ? (
            <button
              type="button"
              className="btn btn-primary ticket-respond rounded-lg ml-4"
              onClick={() => {
                setRespond(!respond);
              }}
            >
              {respond ? <MdCloseFullscreen /> : <FiEdit2 />}
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-info">
          {<span className="color-custom2">User: </span>}
          {"@" + props.ticket.username}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-info">
          {<span className="color-custom2">Created: </span>}
          {props.ticket.created}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-info">
          {<span className="color-custom2">Status: </span>}
          {status}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-info">
          {<span className="color-custom2">Open: </span>}
          {open?.toString()}
        </div>
        <div className="col-12 p-2 color-custom1 ticket-body">
          {props.ticket.message}
        </div>
        {ticketResponse ? (
          <div className="col-12 p-2 color-custom1 ticket-info">
            {<span className="color-custom2">Response: </span>}
            {ticketResponse}
          </div>
        ) : (
          <></>
        )}
        {ticketResponseBy ? (
          <div className="col-12 p-2 color-custom1 ticket-info">
            {<span className="color-custom2">Response by user: </span>}
            {"@" + ticketResponseBy}
          </div>
        ) : (
          <></>
        )}
        {loading ? (
          <div className="col-12 color-custom2 d-flex justify-content-center my-2">
            <BiLoaderAlt className="form-loader-tickets" />
          </div>
        ) : success ? (
          message != "" ? (
            <span className="valid-color p-2 mt-2 d-block">{message}</span>
          ) : (
            <></>
          )
        ) : (
          <>
            <div
              className={
                "col-12 p-2 color-custom1 ticket-form" +
                (respond ? " d-block" : " d-none")
              }
            >
              <form>
                <div className="form-group">
                  <textarea
                    className="form-control ticket-response"
                    rows={5}
                    placeholder="Write your response to this ticket"
                    onChange={(event) => {
                      setResponse(event.currentTarget.value);
                    }}
                    value={response}
                  ></textarea>
                </div>
              </form>
              <button
                type="button"
                className="btn btn-primary ticket-respond rounded-lg"
                onClick={() => {
                  setLoading(true);
                  Respond();
                }}
              >
                Response
              </button>
            </div>
            {message != "" ? (
              <span className="invalid-color p-2 mt-2 d-block">{message}</span>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Ticket;
