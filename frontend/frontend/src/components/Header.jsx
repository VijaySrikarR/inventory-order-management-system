import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {

  const [showProfile, setShowProfile] =
    useState(false);

  return (
    <div className="header">

      <div>
        <h1>InventoryPro</h1>

        <p>
          Enterprise Inventory &
          Order Management Platform
        </p>
      </div>

      <div className="profile-section">

        <div
          className="profile-avatar"
          onClick={() =>
            setShowProfile(!showProfile)
          }
        >
          <FaUserCircle size={38} />
        </div>

        {
          showProfile && (

            <div className="profile-dropdown">

              <div className="profile-top">

                <FaUserCircle
                  size={60}
                />

                <h3>
                  Vijay Srikar
                </h3>

                <p>
                  Software Engineer
                </p>

              </div>

              <hr />

              <div className="profile-info">

                <p>
                  Email:
                  admin@inventorypro.com
                </p>

                <p>
                  Role:
                  Administrator
                </p>

                <p>
                  System:
                  Healthy
                </p>

                <p>
                  Version:
                  1.0.0
                </p>

              </div>

            </div>

          )
        }

      </div>

    </div>
  );
}