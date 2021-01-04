import anime from 'animejs'

export const signUpPage = (e)=> {
  
  anime({
    targets: e,
    translateX: [
      { value: -500 },
    ],
    scaleX: [
      { value: 3 },
      { value: 1 },
    ],
    easing: 'linear',
  });
  anime({
    targets: ".loginPage",
    opacity: 0,
  })
  anime({
    targets: ".registerPage",
    opacity: 1,
    easing: 'linear'
  })
  anime({
    targets: ".wordRight",
    opacity: 0,
    translateX: [{ value: 300 }],
    duration: 500,
    easing: 'linear'
  })
  anime({
    targets: ".wordLeft",
    translateX: [{ value: 0 }],
    marginLeft: "0px",
    opacity: 1,
    easing: 'linear'
  })
}

export const signInPage = (e)=> {
  anime({
    targets: e,
    translateX: [
      { value: 0 },
    ],
    scaleX: [
      { value: 3 },
      { value: 1 },
    ],
    easing: 'linear',
  });
  anime({
    targets: ".loginPage",
    opacity: 1,
    easing: 'linear'
  })
  anime({
    targets: ".registerPage",
    opacity: 0,
  })
  anime({
    targets: ".wordLeft",
    translateX: [{ value: -300 }],
    marginLeft: "-300px",
    opacity: 0,
    duration: 500,
    easing: 'linear'
  })
  anime({
    targets: ".wordRight",
    opacity: 1,
    translateX: [{ value: 0 }],
    easing: 'linear'
  })
}