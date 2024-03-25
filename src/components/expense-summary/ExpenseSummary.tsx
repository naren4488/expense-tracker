import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./ExpenseSummary.css";
import { TypeExpense } from "../../pages/HomePage";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: string;
  cy: string;
  midAngle: string;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({
  active,
  payload = [{ value: 100, name: "food" }],
}: {
  active: boolean;
  payload: [{ value: number; name: string }];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name}: ${payload[0].value} `}</p>
      </div>
    );
  }

  return null;
};

type Props = {
  expenses: TypeExpense[];
};

const ExpenseSummary = ({ expenses }: Props) => {
  if (!expenses.length) {
    return <span>No expenses to show</span>;
  } else {
    return (
      <div className="expense-summary">
        <h3>Expense summary</h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={expenses}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
              nameKey="category"
            >
              {expenses.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <CustomTooltip
                  active={true}
                  payload={[{ value: 0, name: "food" }]}
                />
              }
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default ExpenseSummary;
