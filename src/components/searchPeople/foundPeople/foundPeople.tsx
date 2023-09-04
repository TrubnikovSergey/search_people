import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar, GridRenderCellParams } from "@mui/x-data-grid";
import { IUser } from "../../../types";
import "./foundPeople.css";

interface FoundPeopleProp {
  listPeople: IUser[];
}

const FoundPeople: React.FC<FoundPeopleProp> = ({ listPeople }) => {
  const getGridColDef = (data: IUser[]): GridColDef[] => {
    if (data.length > 0) {
      const listKeys: string[] = Object.keys(data[0]);
      const arrayColDef: GridColDef[] = [];

      for (const item of listKeys) {
        if (item === "surname") {
          arrayColDef.push({
            field: item,
            headerName: item,
            headerClassName: "grid-header",
            flex: 1,
            renderCell: (params: GridRenderCellParams<IUser>) => {
              return (
                <div className="wrapper-avatar">
                  <div className="container-avatar">
                    <img className="avatar" src={params.row.avatar} alt="avatar" />
                    <div className="surname">{params.value}</div>
                  </div>
                </div>
              );
            },
          });
          continue;
        }
        if (item !== "id" && item !== "avatar") {
          arrayColDef.push({ field: item, headerClassName: "grid-header", headerName: item, flex: 1 });
        }
      }

      return arrayColDef;
    }
    return [{ field: "", headerName: "", width: 0 }];
  };
  const rows: GridRowsProp = [...listPeople];

  const columns: GridColDef[] = getGridColDef(listPeople);

  return listPeople.length > 0 ? (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      // slots={{
      //   toolbar: GridToolbar,
      // }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
    />
  ) : (
    <h1>Loading...</h1>
  );
};

export default FoundPeople;
