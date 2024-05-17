import { Col, Input, Row, TablePaginationConfig } from "antd";
import { TableMasterProps } from "@/reduxStore";
import { Button, Table, useSelector } from "@/package";
import { RootState, UtilityState } from "@/reduxStore";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const TableMaster = (props: TableMasterProps) => {
  const {
    dataSource,
    columns,
    addButtonTitle,
    rowKey,
    total,
    loading,
    isLoading = false,
    changePagenation,
    onAddButtonClick,
    scrollX,
    handleSearch,
    addButtonTitle2,
    onAddButtonClick2,
    expandable,
    disabledPagenation,
    disabledSearch,
    title,
    rowSelection,
    id,
    footer,
    summary,
  } = props;

  const utility = useSelector<RootState<string>, UtilityState<string>>(
    (state) => state.utility
  );

  const [value, setvalue] = useState("");
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  useState<TablePaginationConfig>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
    if (handleSearch === undefined) {
      const regex = new RegExp(`.*${e.target.value}.*`, "gi"); // Tambahkan .* di sekitar e.target.value

      const result = dataSource.filter((item: any) => {
        return columns.some((column) => regex.test(item[column.dataIndex]));
      });

      if (e.target.value === "") {
        setData(dataSource);
      } else {
        setData(result);
      }
    } else {
      handleSearch(e);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (changePagenation) {
      changePagenation({
        ...pagination,
        q: value || "",
      });
    }
  };

  const tableProps = {
    loading,
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        {disabledSearch !== true && (
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={value}
            onChange={handleSearchChange}
            style={{ marginBottom: "16px" }}
          />
        )}
      </Col>
      <Col span={18} className="text-end">
        {addButtonTitle !== undefined && (
          <Button type="primary" onClick={onAddButtonClick}>
            {addButtonTitle}
          </Button>
        )}
        {addButtonTitle2 !== undefined && (
          <Button type="primary" className="ml-2" onClick={onAddButtonClick2}>
            {addButtonTitle2}
          </Button>
        )}
      </Col>
      <Col span={24} className="mt-4">
        {title && title}
        <Table
          {...tableProps}
          id={id}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          loading={utility.getLoading.table || isLoading}
          rowKey={rowKey}
          scroll={{ x: scrollX ? 1300 : 0 }}
          pagination={
            disabledPagenation
              ? false
              : {
                  total: total || 0, // totalData count returned from backend
                }
          }
          expandable={expandable}
          onChange={handleTableChange}
          footer={footer}
          summary={summary}
        />
      </Col>
    </Row>
  );
};

export default TableMaster;
