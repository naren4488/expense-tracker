import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TypeExpense } from "../../pages/HomePage";
import "./ExpenseTrends.css";

type Props = {
  expenses: TypeExpense[];
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: [{ value: number; payload: { category: ""; date: "" } }];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.category}: ${payload[0].value} (${payload[0].payload.date}) `}</p>
      </div>
    );
  }
};

const ExpenseTrends = ({ expenses }: Props) => {
  if (!expenses.length) {
    return <span>No expenses trends available</span>;
  } else {
    const data = [...expenses];
    const latestExpenses = data
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3);

    return (
      <div className="expense-trends">
        <h3>Latest Expenses</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={latestExpenses}
            layout={"vertical"}
            margin={{
              top: 15,
              right: 30,
              left: 64,
              bottom: 25,
            }}
          >
            <XAxis
              tick={{}}
              type="number"
              label={{
                value: "Amount",
                position: "bottom",
                offset: 0,
              }}
            />
            <YAxis tickLine={false} dataKey="category" type="category" />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={
                <CustomTooltip
                  active={true}
                  payload={[{ value: 0, payload: { category: "", date: "" } }]}
                />
              }
            />

            <Bar dataKey="amount" fill="#1a1648" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default ExpenseTrends;
