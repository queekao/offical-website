import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
function ProfileCard(props: any) {
  const date = new Date(props.data?.created_at)
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        style={{ height: '13rem' }}
        src={props.data?.image ? props.data?.image : props.data?.poster}
      />
      <Card.Body>
        <Card.Title>{props.data?.title}</Card.Title>
        <Card.Text>編號:{props.data?.id}</Card.Text>
        <Card.Text>{date.toDateString()}</Card.Text>
        <Button variant="primary" href={`${props.path}/${props.data?.id}`}>
          觀看內容
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard
