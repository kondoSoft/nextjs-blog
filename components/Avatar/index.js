
import styles from './styles.module.css'



export default function avatar({initials}) {
 
 function  extractInitials (name){
 let extractName = name.split(' ').map(n => n[0])

 if ( extractName.length > 2){
   return name = extractName[0] + extractName[2]
 }else if (extractName.length ==2){
   return name = extractName[0] + extractName[1]
  }else {return name = extractName[0]}
 
}
 let a =extractInitials(initials)

  return (
    <div className={styles.avatar}>
    	<p className={styles.initilas}>{a}</p>
    </div>
  )
}
