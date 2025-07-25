// function CoreConsepts(props){
//   return (
//     <li>
//       <img src={props.image} alt={props.title} />
//       <h2>
//         {props.title}
//       </h2>
//       <p>{props.description}</p>
//     </li>
//   )
// }
export default function CoreConsepts({image, title, description}){
  return (
    <li>
      <img src={image} alt={title} />
      <h2>
        {title}
      </h2>
      <p>{description}</p>
    </li>
  )
}