import TrafficChart from '@/components/Page/Dashboard/TrafficChart';
import { getDictionary } from '@/locales/dictionary';
import { Card, CardBody } from 'react-bootstrap';

export default async function Page() {
  const dict = await getDictionary();

  return (
    <div>
      <Card className="mb-4">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">{dict.dashboard.traffic.title}</h4>
            </div>
          </div>
          <div
            style={{
              height: '300px',
              marginTop: '40px',
            }}
          >
            <TrafficChart />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
