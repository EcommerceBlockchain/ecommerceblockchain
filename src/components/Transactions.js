import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import activity from "../images/activity.gif";
import { Link } from "react-router-dom";
import colors from "../colors";

function Transactions({ userProfileData }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getdata = () => {
    let arr = [];
    setLoading(true);
    getDocs(
      query(
        collection(getFirestore(), "transactions"),
        where("to", "array-contains-any", userProfileData?.walletAddress)
      )
    ).then((res) => {
      res.docs.forEach((item) => {
        console.log(item.data(), "mast");
        // setTransactions((prev) => [...prev, { ...item.data(), id: item.id }]);
        arr.push({ ...item.data(), id: item.id, self: false });
      });
      getDocs(
        query(
          collection(getFirestore(), "transactions"),
          where("from", "in", userProfileData?.walletAddress)
        )
      ).then((res) => {
        res.docs.forEach((item) => {
          console.log(item.data(), "mast 2");
          // setTransactions((prev) => [...prev, { ...item.data(), id: item.id }]);
          arr.push({ ...item.data(), id: item.id, self: true });
        });
        arr = [...new Set([...arr])];
        arr.sort((b, a) => {
          return a.timestamp - b.timestamp;
        });

        setTransactions([...arr]);
      });
    });

    console.log("transactions,", transactions);

    setLoading(false);
  };

  useEffect(() => {
    setTransactions([]);
    getdata();
  }, []);

  return (
    <div>
      <p>Transactions</p>
      {loading && <img width={30} src={activity} alt="activity" />}
      {transactions.length === 0 && !loading ? (
        <p>No Transactions to display</p>
      ) : (
        <div>
          <table class="user-table align-items-center table table-hover">
            <thead>
              <tr>
                <th class="border-bottom">Hash</th>
                <th class="border-bottom">Products</th>
                <th class="border-bottom">Amount</th>
                <th class="border-bottom">Timestamp</th>
                <th class="border-bottom">Action</th>
                <th class="border-bottom">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => {
                return (
                  <tr>
                    <td style={{ maxWidth: "100px" }}>
                      <Link class="fw-normal card-link" to={"/"}>
                        {item.transactionHash}
                      </Link>
                    </td>
                    <td style={{ maxWidth: "150px" }}>
                      <span class="fw-normal">
                        [
                        {item.products.map((pro, index) => {
                          return (
                            <>
                              <Link to={"/single-product"} state={{ id: pro }}>
                                {pro}
                              </Link>
                              {index < item.products.length - 1 && (
                                <span>,</span>
                              )}
                            </>
                          );
                        })}
                        ]
                      </span>
                    </td>
                    <td>
                      {item.self ? (
                        <span
                          class="fw-normal"
                          style={{
                            color: colors.red,
                          }}
                        >
                          - {item.totalAmount.toFixed(10)} Eth
                        </span>
                      ) : (
                        <span
                          class="fw-normal"
                          style={{
                            color: colors.green,
                          }}
                        >
                          +
                          {item.amount[
                            item.to.indexOf(
                              item.to.filter((x) =>
                                userProfileData?.walletAddress?.includes(x)
                              )[0]
                            )
                          ].toFixed(10)}{" "}
                          Eth
                        </span>
                      )}
                    </td>
                    <td>
                      <span class="fw-normal">
                        {new Date(
                          item?.timestamp?.seconds * 1000 +
                            item?.timestamp?.nanoseconds / 1000000
                        ).toLocaleString()}
                      </span>
                    </td>
                    <td>
                      {item.self ? (
                        <span class="fw-normal" style={{ color: colors.red }}>
                          Debit
                        </span>
                      ) : (
                        <span class="fw-normal" style={{ color: colors.green }}>
                          Credit
                        </span>
                      )}
                    </td>
                    <td>
                      {item.status !== "Success" ? (
                        <span class="fw-normal" style={{ color: colors.red }}>
                          Failed
                        </span>
                      ) : (
                        <span class="fw-normal" style={{ color: colors.green }}>
                          Success
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
