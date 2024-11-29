import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import {
  People,
  Inventory,
  AttachMoney,
  TrendingUp,
  Warning,
} from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

// Registrar las escalas y elementos en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
);

// Datos de ejemplo
const totalTrabajadores = 50;
const totalProductos = 200;
const importeVentas = 15000;
const productosSinStock = ["Producto 1", "Producto 2"];
const productoMasVendido = "Cerveza";

// Datos para el gráfico de ventas semanales
const ventasSemanales = [500, 800, 1200, 1000, 1500, 1800, 2100];
const ventasSemanaAnterior = [400, 700, 1000, 900, 1300, 1700, 2000]; // Datos de la semana anterior
const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const Dashboard = () => {
  const data = {
    labels: diasSemana,
    datasets: [
      {
        label: "Ventas Semana Actual",
        data: ventasSemanales,
        fill: false,
        backgroundColor: "#1976d2",
        borderColor: "#1976d2",
        tension: 0.1, // Para suavizar la línea
        pointRadius: 5, // Tamaño de los puntos en el gráfico
      },
      {
        label: "Ventas Semana Anterior",
        data: ventasSemanaAnterior,
        fill: false,
        backgroundColor: "#d32f2f",
        borderColor: "#d32f2f",
        tension: 0.1, // Para suavizar la línea
        pointRadius: 5, // Tamaño de los puntos en el gráfico
      },
    ],
  };

  const data1 = [
    { name: "Rental Cost", value: 30675 },
    { name: "Wages", value: 22675 },
    { name: "Launch", value: 16000 },
    { name: "Electricity", value: 10000 },
    { name: "Medical", value: 4000 },
    { name: "Others", value: 2025 },
  ];
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF8042",
    "#FF8042",
  ];
  const totalCost = data1.reduce((sum, entry) => sum + entry.value, 0);

  const CustomLabel = ({ cx, cy, value }) => {
    return (
      <text
        x={cx}
        y={cy}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "24px", fontWeight: "bold" }}
      >
        {`$${value}`}
      </text>
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Información General
      </Typography>
      <Grid container spacing={2}>
        {/* Columna izquierda (60%) */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            {/* Tarjetas de información */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#cfd8dc", borderRadius: 2 }}>
                <CardContent>
                  <People sx={{ color: "#1976d2", fontSize: 40 }} />
                  <Typography variant="h5">{totalTrabajadores}</Typography>
                  <Typography color="text.secondary">
                    Total de Trabajadores
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#cfd8dc", borderRadius: 2 }}>
                <CardContent>
                  <Inventory sx={{ color: "#1976d2", fontSize: 40 }} />
                  <Typography variant="h5">{totalProductos}</Typography>
                  <Typography color="text.secondary">
                    Total de Productos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#cfd8dc", borderRadius: 2 }}>
                <CardContent>
                  <AttachMoney sx={{ color: "#1976d2", fontSize: 40 }} />
                  <Typography variant="h5">${importeVentas}</Typography>
                  <Typography color="text.secondary">
                    Importe de Ventas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Gráfico: Comparación de Ventas Semana Actual vs Semana Anterior */}
          <Card
            sx={{ marginTop: 2, backgroundColor: "#cfd8dc", borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6">Comparación de Ventas</Typography>
              <Box sx={{ width: "100%", height: 250 }}>
                <Line data={data} />
              </Box>
            </CardContent>
          </Card>

          {/* Lista de productos sin stock */}
          <Card
            sx={{ marginTop: 2, backgroundColor: "#cfd8dc", borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6">Productos sin Stock</Typography>
              <Typography color="text.secondary">
                {productosSinStock.length > 0
                  ? productosSinStock.join(", ")
                  : "No hay productos sin stock"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha (40%) */}
        <Grid item xs={12} md={5}>
          {/* Gráfico de Desglose de Gastos */}
          <Card sx={{ backgroundColor: "#cfd8dc", borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Desglose de Gastos
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* Gráfico PieChart */}
                  <PieChart width={300} height={300}>
                    <Pie
                      data={data1}
                      cx={150}
                      cy={150}
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      labelLine={false}
                      label={({ cx, cy }) => (
                        <CustomLabel cx={cx} cy={cy} value={totalCost} />
                      )}
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>

                  {/* Leyenda */}
                  <Box sx={{ marginLeft: 3 }}>
                    {data1.map((entry, index) => (
                      <Typography
                        key={index}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            backgroundColor: COLORS[index % COLORS.length],
                            marginRight: 8,
                            borderRadius: "50%",
                          }}
                        ></span>
                        {`${entry.name}: $${entry.value}`}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Otra información */}
          <Card
            sx={{ marginTop: 2, backgroundColor: "#cfd8dc", borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6">Información Adicional</Typography>
              <Typography color="text.secondary">
                Aquí puedes agregar cualquier otra información relevante para tu
                panel de control
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;