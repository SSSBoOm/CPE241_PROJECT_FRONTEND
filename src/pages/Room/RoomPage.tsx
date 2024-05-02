import { DatePicker, InputNumber, Space } from 'antd'
import Room from '../../components/Card/Room'

const { RangePicker } = DatePicker
const RoomPage = () => {
  return (
    <>
      <div className="container mx-auto grid w-2/5 grid-rows-3">
        <p className="text-4xl font-bold text-primary-blue-700">Room</p>
        <p className="text-2xl text-primary-blue-700">Room</p>
        <p className="text-base text-primary-blue-700">content</p>
      </div>
      <div className=" container mx-auto w-fit">
        <Space direction="vertical" size={12}>
          <RangePicker size="large" />
        </Space>
        <InputNumber size="large" min={1} max={8} defaultValue={2} className=" mx-9" />
        <button>ddd</button>
      </div>
      <Room />
      <Room />
      <Room />
    </>
  )
}
export default RoomPage
