import { useState } from "react";
import "../../assets/style/Ticket/SubmitTicket.css";

const SubmitTicketForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="row mx-auto">
      <div className="col m-4 color-custom1 ticket-form">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control ticket-header-input"
              placeholder="Ticket header"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control ticket-body-input"
              rows={10}
              placeholder="Write your ticket message"
            ></textarea>
          </div>
          <div className="form-group">
            <div className="rounded-lg ticket-body-input p-2 tags-body">
              <div
                className={"col p-2" + (tags.length ? " d-block" : " d-none")}
              >
                {tags.map((tag) => {
                  return (
                    <span className="bg-custom3 mr-2 p-2 rounded-lg">
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
        </form>
        <button
          type="button"
          className="btn btn-primary ticket-respond rounded-lg"
        >
          Submit a ticket
        </button>
      </div>
    </div>
  );
};

export default SubmitTicketForm;
