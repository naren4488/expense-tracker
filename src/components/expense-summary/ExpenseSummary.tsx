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
// to get customized label to show for pie chart
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

// to show custom tooltip for pie chart
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
  /**
   * to merge similar category expenses at one place
   * @param expenseList  list of expenses
   * @returns {name: string, value : number} merged expenses in array
   */
  const getData = (expenseList: TypeExpense[]) => {
    const map = new Map();
    expenseList.map((expense) => {
      if (map.has(expense.category)) {
        map.set(expense.category, map.get(expense.category) + expense.amount);
      } else {
        map.set(expense.category, expense.amount);
      }
    });
    const data = [];
    for (const [key, value] of map) {
      data.push({ name: key, value });
    }
    return data;
  };

  if (!expenses.length) {
    return <span>No expenses summary to display</span>;
  } else {
    const data = getData(expenses);

    return (
      <div className="expense-summary">
        <h3>Expense summary</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, index) => (
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
                  payload={[{ value: 0, name: "category" }]}
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
