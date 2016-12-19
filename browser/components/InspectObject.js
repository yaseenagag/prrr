import React from 'react'
import util from 'util'

export default function InspectObject({object, showHidden=false, depth=10}){

  if (object instanceof Error){
    return <div>
      <strong>{object.message}</strong>
      <pre>{object.stack.replace('\\n', '\n')}</pre>
    </div>
  }

  return <pre>{
    util.inspect(object, { showHidden, depth })
  }</pre>
}
