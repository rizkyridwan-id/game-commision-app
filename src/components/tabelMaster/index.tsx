import { Col, Input, Row, TablePaginationConfig } from "antd";
import { Table } from "@/package";
import { useAppSelector } from "@/reduxStore";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TableMasterProps } from "@/interface";
import { ButtonCustom } from "@/utils";

const TableMaster = (props: TableMasterProps) => {
  const {
    dataSource,
    columns,
    addButtonTitle,
    rowKey,
    total,
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
    width = 1300,
  } = props;

  const utility = useAppSelector((state) => state.utility);

  const [value, setValue] = useState("");
  const [data, setData] = useState(dataSource.length > 0 ? dataSource : []);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (handleSearch === undefined) {
      const regex = new RegExp(`.*${e.target.value}.*`, "gi"); // Tambahkan .* di sekitar e.target.value

      const result = dataSource.filter((item: any) => {
        return columns.some((column: any) =>
          regex.test(item[column.dataIndex])
        );
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

  return (
    <Row gutter={16}>
      <Col span={6}>
        {!disabledSearch && (
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
        {addButtonTitle && (
          <ButtonCustom color="primary" onClick={onAddButtonClick}>
            {addButtonTitle}
          </ButtonCustom>
        )}
        {addButtonTitle2 && (
          <ButtonCustom
            color="primary"
            className="ml-2"
            onClick={onAddButtonClick2}
          >
            {addButtonTitle2}
          </ButtonCustom>
        )}
      </Col>
      <Col span={24} className="mt-4">
        {title && <h3>{title}</h3>}
        <Table
          id={id}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          loading={utility.getLoading.table || isLoading}
          rowKey={rowKey as string}
          scroll={{ x: scrollX ? (width ? width : 1300) : 0 }}
          pagination={
            disabledPagenation
              ? false
              : {
                  total: total || 0,
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
