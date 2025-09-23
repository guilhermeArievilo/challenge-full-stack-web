import { Replace } from "@/shared/helpers/Replace";
import { ObjectId } from "bson";

export type StudentProps = {
  name: string;
  cpf: string;
  ra: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}


export default class Student {
  private _id: string;
  private props: StudentProps;

  public constructor(props: Replace<StudentProps, { createdAt?: Date; updatedAt?: Date; }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? this.generateId();
  }

  private generateId(): string {
    return new ObjectId().toHexString();
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get ra(): number {
    return this.props.ra;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  toJSON() {
    return this.props;
  }
}