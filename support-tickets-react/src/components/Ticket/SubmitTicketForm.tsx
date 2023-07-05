import { useContext, useState } from "react";
import "../../assets/style/Ticket/SubmitTicket.css";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { UserContext } from "../../context/UserContext/UserContext";

const SubmitTicketForm = () => {
  const { defaultApi, user } = useContext(UserContext);

  const SubmitTicket = async (
    header: string,
    message: string,
    tags: string[]
  ) => {
    try {
      if (header.trim().length == 0 || message.trim().length == 0) {
        throw new Error("Some fields are not valid");
      }

      const data = {
        ticket_header: header.trim(),
        ticket_message: message.trim(),
        tags: tags,
        token: user.token,
      };

      const result = await axios.post(`${defaultApi}/submit_ticket`, data);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [validMessage, setValidMessage] = useState(false);

  const [ticketHeader, setTicketHeader] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const [submitAction, setSubmitAction] = useState(false);

  return (
    <div className="row mx-auto">
      <div className="col m-4 color-custom1 ticket-form">
        <div>
          <div className="form-group">
            <input
              type="text"
              className="form-control ticket-header-input"
              placeholder="Ticket header"
              onChange={(event) => {
                setTicketHeader(event.currentTarget.value);
              }}
              value={ticketHeader}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control ticket-body-input"
              rows={10}
              placeholder="Write your ticket message"
              onChange={(event) => {
                setTicketMessage(event.currentTarget.value);
              }}
              value={ticketMessage}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="rounded-lg ticket-body-input p-2 tags-body">
              <div
                className={"col p-2" + (tags.length ? " d-block" : " d-none")}
              >
                {tags.map((tag, id) => {
                  return (
                    <span key={id} className="bg-custom3 mr-2 p-2 rounded-lg">
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control ticket-transparent-input"
                  placeholder="Tags"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      let tag = event.currentTarget.value.toString().trim();
                      if (
                        tag &&
                        tag.indexOf("#") == -1 &&
                        !tags.includes("#" + tag)
                      ) {
                        tag = "#" + tag;
                        setTags(tags.concat(tag));
                        event.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="col-12 color-custom2 d-flex justify-content-center my-2">
            <BiLoaderAlt className="form-loader-ticket" />
          </div>
        ) : (
          <p
            className={
              "color-custom3" +
              (submitAction
                ? validMessage
                  ? " valid-color"
                  : " invalid-color"
                : "")
            }
            id="message"
          >
            {message}
          </p>
        )}
        <br />
        <button
          type="button"
          className="btn btn-primary ticket-respond rounded-lg"
          onClick={async () => {
            setLoading(true);
            const result = await SubmitTicket(
              ticketHeader,
              ticketMessage,
              tags
            );
            if (result) {
              setValidMessage(true);
              setMessage("Successfully submitted the ticket");

              // Resets form fields
              setTicketHeader("");
              setTicketMessage("");
              setTags([]);
            } else {
              setValidMessage(false);
              setMessage("Error while submitting the ticket");
            }
            setSubmitAction(true);
            setLoading(false);
          }}
        >
          Submit a ticket
        </button>
      </div>
    </div>
  );
};

export default SubmitTicketForm;
