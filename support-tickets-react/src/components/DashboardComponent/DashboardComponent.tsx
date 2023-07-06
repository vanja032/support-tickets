import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import { BiLoaderAlt } from "react-icons/bi";
import DoughnutComponent from "../DoughnutComponent/DoughnutComponent";

const DashboardComponent = () => {
  const { user } = useContext(UserContext);

  const colors = ["#ffae35", "#696969"];
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(0);
  const [pending, setPending] = useState(0);
  const [displayChart, setDisplayChart] = useState(false);

  useEffect(() => {
    if (user.username) {
      const closedTickets = user.tickets?.filter(
        (ticket) => ticket.status === "closed"
      );
      const pendingTickets = user.tickets?.filter(
        (ticket) => ticket.status === "pending"
      );

      setPending(pendingTickets ? pendingTickets.length : 0);
      setClosed(closedTickets ? closedTickets.length : 0);
      if (pending || closed) {
        setDisplayChart(true);
      }

      setLoading(false);
    }
  }, [user, pending, closed, displayChart]);

  return loading ? (
    <div className="col-12 color-custom2 d-flex justify-content-center my-2">
      <BiLoaderAlt className="dashboard-loader" />
    </div>
  ) : (
    <div>
      {displayChart ? (
        <div className="col-8 col-md-6 col-lg-4 mx-auto justify-content-center">
          <DoughnutComponent
            dn_data={{
              labels: ["pending", "closed"],
              data: [pending, closed],
              colors: colors,
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="col-8 col-md-6 col-lg-4 mx-auto justify-content-center mt-4 dashboard_status_info">
        <div className="col-12">
          <span style={{ color: colors[0] }}>Pending: {pending}</span>
        </div>
        <div className="col-12">
          <span style={{ color: colors[1] }}>Closed: {closed}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
