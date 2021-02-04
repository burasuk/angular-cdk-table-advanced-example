import { Injectable } from "@angular/core";
import { Query, QueryDefinition } from "./../cdk/query";
import { User } from "./user";

enum FilterValuesEnum {
  name,
  email,
  website
}

type EnumKeys = keyof typeof FilterValuesEnum;
type EnumKeyFields = { [key in EnumKeys]?: any };

interface IFilterValues extends EnumKeyFields {
  fullName?: string;
  email?: string;
  website?: string;
}

@Injectable()
export class UserQuery extends Query<User, IFilterValues> {
  queryDefinition: QueryDefinition<User, IFilterValues>[] = [
    {
      filterPropName: FilterValuesEnum[FilterValuesEnum.name],
      queryFn: this.findByName
    },
    {
      filterPropName: FilterValuesEnum[FilterValuesEnum.email],
      queryFn: this.findByEmail
    },
    {
      filterPropName: FilterValuesEnum[FilterValuesEnum.website],
      queryFn: this.findByWebsite
    }
  ];

  private findByName(row: User, query: IFilterValues) {
    return (
      row.fullName.toLowerCase().indexOf(query.fullName.toLowerCase()) != -1
    );
  }

  private findByEmail(row: User, query: IFilterValues) {
    return row.email.toLowerCase().indexOf(query.email.toLowerCase()) != -1;
  }

  private findByWebsite(row: User, query: IFilterValues) {
    const regexp = new RegExp(`${query.website.toLowerCase()}$`, "i");
    return row.website.toLowerCase().search(regexp) >= 0;
  }
}
