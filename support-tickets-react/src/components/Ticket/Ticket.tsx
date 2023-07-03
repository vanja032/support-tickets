import { useState } from "react";
import "../../assets/style/Ticket/Tickets.css";
import { FiEdit2 } from "react-icons/fi";
import { MdCloseFullscreen } from "react-icons/md";

const Ticket = () => {
  const [respond, setRespond] = useState(false);
  return (
    <div className="col-12 col-lg-6 p-4">
      <div className="bg-custom4 rounded p-2 px-4">
        <div className="col-12 p-3 color-custom2 ticket-header">
          Header text{" "}
          <button
            type="button"
            className="btn btn-primary ticket-respond rounded-lg ml-4"
            onClick={() => {
              setRespond(!respond);
            }}
          >
            {respond ? <MdCloseFullscreen /> : <FiEdit2 />}
          </button>
        </div>
        <div className="col-12 p-3 color-custom1 ticket-body">Body text</div>
        <div
          className={
            "col-12 p-3 color-custom1 ticket-form" +
            (respond ? " d-block" : " d-none")
          }
        >
          <form>
            <div className="form-group">
              <textarea
                className="form-control ticket-response"
                rows={5}
                placeholder="Write your response to this ticket"
              ></textarea>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary ticket-respond rounded-lg"
          >
            Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
