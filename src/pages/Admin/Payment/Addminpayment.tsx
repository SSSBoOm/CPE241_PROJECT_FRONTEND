import type { TableColumnsType } from 'antd'
import { Button, Switch, Table } from 'antd'
import Swal from 'sweetalert2'
const Addcard = () => {
  Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    cancelButtonText: 'ยกเลิก',
    confirmButtonText: 'ยืนยัน',
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      try {
        Swal.fire({
          icon: 'success',
          title: `บัตรประเภท ${login} ได้ถูกเพิ่ม`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `)
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
}
const Addminpayment = () => {
  const column_data: TableColumnsType = [
    {
      title: 'Type name',
      dataIndex: 'typename',
      key: 'typename'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: () => {
        return <Switch />
      }
    }
  ]
  return (
    <>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p>Payment</p>
            <Button onClick={Addcard}>Addcard</Button>
          </div>
          <Table columns={column_data}></Table>
        </div>
      </div>
    </>
  )
}
export default Addminpayment
