import * as React from "react";

import { IHierarchicalListProps } from "./IHierarchicalListProps";

import * as jQuery from "jquery";
import { Tree, TreeNode } from "react-organizational-chart";
import styles from "./HierarchicalList.module.scss";

export interface IUserListState {
  listitems: [
    {
      Email: "";
      Id: "";
    }
  ];
}

export default class HierarchicalList extends React.Component<
  IHierarchicalListProps,
  IUserListState
> {
  static siteurl: string = "";

  public constructor(props: IHierarchicalListProps, state: IUserListState) {
    super(props);
    this.state = {
      listitems: [
        {
          Email: "",
          Id: "",
        },
      ],
    };
  }

  public componentDidMount() {
    let reactcontexthandler = this;
    jQuery.ajax({
      url: "https://zehntechtechnologies.sharepoint.com/_api/Web/SiteUsers",
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        resultData.d.results.forEach((element) => {});
        reactcontexthandler.setState({
          listitems: resultData.d.results,
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }

  public render(): React.ReactElement<IHierarchicalListProps> {
    let interns = [];
    let seniors = [];

    this.state.listitems.map(function (item) {
      var senArray = [item.Email];

      var onlySenior = senArray.map(checkSen);

      function checkSen(sen) {
        if (!sen.includes("int")) {
          seniors.push(sen);
        }
      }

      var intArray = [item.Email];

      var onlyInt = intArray.map(checkInt);

      function checkInt(int) {
        if (int.includes("int")) {
          interns.push(int);
        }
      }
    });

    return (
      <>
        <h1 className={styles.head}>Zehntech Site-Users Hierarchical List</h1>
        <div style={{ overflow: "scroll" }} className="paerntDiv">
          <Tree
            label={
              <div style={{ padding: "5px", border: "1px solid blue" }}>
                Mahendra Patidar
              </div>
            }
          >
            {seniors.map((s) => {
              return (
                <TreeNode
                  label={
                    <div 
                    style={{ 
                      padding: "5px",
                       border: "1px solid red"
                        }}
                        >
                      {s}
                    </div>
                  }
                >
                  {interns.map((i) => {
                    return (
                      <TreeNode
                        label={
                          <div
                            style={{
                              padding: "5px",
                              border: "1px solid green",
                            }}
                          >
                            {i}
                          </div>
                        }
                      ></TreeNode>
                    );
                  })}
                </TreeNode>
              );
            })}
          </Tree>
        </div>
      </>
    );
  }
}
