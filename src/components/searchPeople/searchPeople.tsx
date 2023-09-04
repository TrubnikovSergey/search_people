import { useState, useEffect } from "react";
import { FoundPeople } from "./foundPeople";
import { IUser } from "../../types";
import { AxiosResponse } from "axios";
import { httpService } from "../../services";
import "./searchPeople.css";

const SearchPeople = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    httpService.get<IUser[]>("http://localhost:3000/users").then((respons: AxiosResponse<IUser[]>) => {
      if (respons.status === 200) {
        setUsers(respons.data);
      }
    });
  }, []);
  return (
    <div className="wrapper">
      <div className="container">
        <FoundPeople listPeople={users} />
      </div>
    </div>
  );
};

export default SearchPeople;
