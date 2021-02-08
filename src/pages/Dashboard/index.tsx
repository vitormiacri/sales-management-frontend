import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { Container, Content } from '../../styles/global';
import { Card as CardDefault, Table } from '../../components';
import Format from '../../utils/format';

import {
  SumaryTop,
  Value,
  Card,
  Description,
  OrderHistory,
  Title,
  Graphics,
  ContentDashboard,
} from './styles';

interface SumaryValuesData {
  todayValue: number;
  weekValue: number;
  monthValue: number;
  monthAmount: number;
}

interface OrderHistoryData {
  id: number;
  createdAt: string;
  client: { name: string };
  total_value: number;
}

interface GraphData {
  id: string;
  color: string;
}
interface CountGraphData extends GraphData {
  data: {
    Quantidade: string;
    Mês: string;
  }[];
}

interface ValueGraphData extends GraphData {
  data: {
    Valor: number;
    Mês: string;
  }[];
}

const Dashboard: React.FC = () => {
  const [sumaryValues, setSumaryValues] = useState<SumaryValuesData>({
    todayValue: 0,
    weekValue: 0,
    monthValue: 0,
    monthAmount: 0,
  });

  const [ordersHistory, setOrdersHistory] = useState<OrderHistoryData[]>([]);
  const [countGraph, setCountGraph] = useState<CountGraphData[]>([]);
  const [valueGraph, setValueGraph] = useState<ValueGraphData[]>([]);

  useEffect(() => {
    async function loadSumary(): Promise<void> {
      const { data } = await api.get<SumaryValuesData>(
        'dashboard/sumaryOrdersValue',
      );
      setSumaryValues(data);
    }
    loadSumary();
  }, []);

  useEffect(() => {
    async function loadOrdersHistory(): Promise<void> {
      const { data } = await api.get<OrderHistoryData[]>(
        'dashboard/ordersHistory',
      );
      setOrdersHistory(data);
    }
    loadOrdersHistory();
  }, []);

  useEffect(() => {
    async function loadCountGraph(): Promise<void> {
      const { data } = await api.get<CountGraphData[]>(
        'dashboard/totalCountGraph',
      );
      setCountGraph(data);
    }
    loadCountGraph();
  }, []);

  useEffect(() => {
    async function loadValueGraph(): Promise<void> {
      const { data } = await api.get<ValueGraphData[]>(
        'dashboard/totalValueGraph',
      );
      setValueGraph(data);
    }
    loadValueGraph();
  }, []);

  return (
    <Container>
      <Menu />
      <Content>
        <SumaryTop>
          <Card>
            <Description>Vendas de hoje</Description>
            <Value>{Format.currencyBRL(sumaryValues.todayValue)}</Value>
          </Card>
          <Card>
            <Description>Vendas na semana</Description>
            <Value>{Format.currencyBRL(sumaryValues.weekValue)}</Value>
          </Card>
          <Card>
            <Description>Vendas no mês</Description>
            <Value>{Format.currencyBRL(sumaryValues.monthValue)}</Value>
          </Card>
          <Card>
            <Description>Total de pedidos (mês)</Description>
            <Value>{sumaryValues.monthAmount}</Value>
          </Card>
        </SumaryTop>
        <ContentDashboard>
          <Graphics>
            <ResponsiveLine
              data={valueGraph}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              colors="#ff92ba"
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                reverse: false,
              }}
              yFormat={value => Format.currencyBRL(Number(value))}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Meses',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Valores Totais',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh
            />
            <ResponsiveBar
              data={countGraph}
              keys={['quantidade']}
              indexBy="date"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              groupMode="grouped"
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors="#ff92ba"
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Últimos 6 meses',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total de Pedidos',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              animate
              motionStiffness={90}
              motionDamping={15}
            />
          </Graphics>
          <OrderHistory>
            <CardDefault>
              <Title>
                <span>Pedidos recentes</span>
              </Title>
              <Table
                page={0}
                perPage={0}
                totalRows={0}
                handlePagination={() => console.log('nada')}
                header={['Data', 'Cliente', 'Valor Total']}
                noFooter
                noActions
              >
                {ordersHistory &&
                  ordersHistory.map(order => (
                    <tr key={order.id}>
                      <td>{format(parseISO(order.createdAt), 'dd/MM/yyyy')}</td>
                      <td>{order.client.name}</td>
                      <td>{Format.currencyBRL(order.total_value)}</td>
                    </tr>
                  ))}
              </Table>
            </CardDefault>
          </OrderHistory>
        </ContentDashboard>
      </Content>
    </Container>
  );
};

export default Dashboard;
