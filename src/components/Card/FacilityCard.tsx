type Props = {
  name: string
  content: string
  image: string
}

const FacilityCard = (props: Props) => {
  return (
    <div className="max-h-96 max-w-96 overflow-auto rounded-lg border-4 border-primary-blue-600">
      <img src={props.image} className="h-1/2 w-full" alt="" />
      <div>
        {props.name && <p className="text-3xl">{props.name}</p>}
        {props.content && <p>{props.content}</p>}
      </div>
    </div>
  )
}

export default FacilityCard
