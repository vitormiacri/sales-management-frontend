import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { Container, Content } from '../../styles/global';
import Format from '../../utils/format';

import { SumaryTop, Value, Card, Description } from './styles';

interface SumaryValuesData {
  todayValue: number;
  weekValue: number;
  monthValue: number;
  monthAmount: number;
}
const Dashboard: React.FC = () => {
  const [sumaryValues, setSumaryValues] = useState<SumaryValuesData>({
    todayValue: 0,
    weekValue: 0,
    monthValue: 0,
    monthAmount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSumary(): Promise<void> {
      const { data } = await api.get<SumaryValuesData>(
        'dashboard/sumaryOrdersValue',
      );
      setSumaryValues(data);
    }
    loadSumary();
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
      </Content>
    </Container>
  );
};

export default Dashboard;
