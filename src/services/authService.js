export function clearOut(){
  localStorage.clear()
}

export function getUser(){
  return  {
    userEmail : localStorage.getItem("email"),
    userName : localStorage.getItem("userName")
  }
}

export function setUser(formData){
  localStorage.setItem("userName", formData.name)
  localStorage.setItem("email", formData.email)
}
