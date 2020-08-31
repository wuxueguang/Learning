import React from "react";
import classNames from "classnames";
import { ColumnProps } from "antd/lib/table";

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export namespace DDTypes {
  export type BaseT = {
    key: number;
    [key: string]: any 
  };

  // supported types
  export type DDSupportTypes = "string" | "integer" | "float" | "password";
  export type DDUnsupportTypes = string;

  export interface DDDataFields<T extends BaseT> extends ColumnProps<T> {
    dataIndex: string;
    key: string | number;
    title: string;
    type: DDSupportTypes | DDUnsupportTypes; /// sub element type
    display?: boolean;
    disabled?: boolean;
  }

  export interface DDElementProps<T extends BaseT> {
    model: DDDataFields<T>;
    data: T;
    type: string; //  panel type
    index: number;
    parent: DDBasePanel<T>;
  }

  export interface DDElement<T extends BaseT> {
    props: DDElementProps<T>;

    /**
     *
     * child render table cell
     *
     * @param data  data to current cell, **Must Be Reference**
     * @param model model to discribe current data
     * @param index index
     */
    renderCell(data: T, model: DDDataFields<T>, index: number): React.ReactNode;

    /**
     *
     * child render form field
     * assign data on child field value changed
     * @param data  data to current cell, **Must Be Reference**
     * @param model model to discribe current data
     * @param index index
     */
    renderField(
      data: T,
      model: DDDataFields<T>,
      index: number
    ): React.ReactNode;

    /**
     *
     * child render grid cell
     *
     * @param data  data to current cell, **Must Be Reference**
     * @param model model to discribe current data
     * @param index index
     */
    renderPlain(
      data: T,
      model: DDDataFields<T>,
      index: number
    ): React.ReactNode;
  }

  export class DDElement<T extends BaseT> extends React.PureComponent<
    DDElementProps<T>
  > {
    defaultClassName: string;

    constructor(props: DDElementProps<T>) {
      super(props);
      this.state = {};
      this.defaultClassName = classNames(
        `${props.type}-field`,
        `${props.type}-${props.parent.props.name}`
      );
    }

    /**
     * switch case that choose which element will render
     *
     * @returns
     * @memberof DDElement
     */
    render() {
      const { type, data, model, index } = this.props;
      switch (type) {
        case "table":
          return this.renderCell(data, model, index);
        case "form":
          return this.renderField(data, model, index);
        case "panel":
        case "grid":
          return this.renderPlain(data, model, index);
        default:
          return null;
      }
    }
  }

  export type DDPanelTypes = "table" | "form" | "grid";

  export interface DDBasePanelProps<T extends BaseT> {
    model: DDTypes.DDDataFields<T>[];
    data: T | T[];
    name: string;
    panelTitle?: any;
  }

  /**
   * base panel class
   *
   * @export
   * @abstract
   * @class DDPanel
   * @extends {React.Component}
   * @template T
   */
  export class DDBasePanel<T extends BaseT> extends React.PureComponent<
    DDBasePanelProps<T>
  > {}
}
