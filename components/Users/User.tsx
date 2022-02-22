import type { NextComponentType, NextPageContext } from "next";
import type { TDataItem } from "../../types/usersPage.types";
import styles from "../../styles/User.module.css";

type TProps = {
  user: TDataItem;
};

const User: NextComponentType<NextPageContext, {}, TProps> = ({ user }) => {
  const { id, name, username, email, address, phone, website, company } = user;

  return (
    <div className={styles.user_container}>
      <h3 className={styles.user_id}># {id}</h3>

      <h4 className={styles.user_heading}>Details</h4>
      <p>Name:- {name}</p>
      <p>UserName:- {username}</p>
      <p>Email:- {email}</p>
      <p>Phone:- {phone}</p>
      <p>Website:- {website}</p>

      <h4 className={styles.user_heading}>Address</h4>
      <p>Street:- {address.street}</p>
      <p>Suite:- {address.suite}</p>
      <p>City:- {address.city}</p>
      <p>ZipCode:- {address.zipcode}</p>

      <h4 className={styles.user_heading}>Company</h4>
      <p>Name:- {company.name}</p>
      <p>CatchPhrase:- {company.catchPhrase}</p>
      <p>BS:- {company.bs}</p>
    </div>
  );
};

export default User;
