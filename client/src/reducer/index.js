const initialState = {
  dogs: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
      case "ORDER_BY_NAME":
        
        let sortedArr = action.payload === 'asc' ?
        // ascendente
        state.dogs.sort(function (a, b) {
            if(a.name > b.name) {
                return 1;
            }
            if(b.name > a.name) {
                return -1;
            }
            return 0;
        }) :
        //descendente
        state.dogs.sort(function (a, b) {
            if(a.name > b.name) {
                return -1;
            }
            if(b.name > a.name) {
                return 1;
            }
            return 0;
        })
        return {
            ...state,
            dogs: sortedArr
        };




        case 'ORDER_BY_WEIGHT':
          let arrByWeight = action.payload === 'asc'?
          state.dogs.sort((a, b) => {
            //split de weight (usamos los menores)
           
            let weightSplitA = a.weight.split('-')
            let weightA = weightSplitA[0]
            let weightSplitB = b.weight.split('-')
            let weightB = weightSplitB[0]
            if(!a.weight) weightA = 0
            if(!b.weight)  weightB = 0

            //ascendente
            if(weightA > weightB){
              return 1
            }
            if(weightB > weightA) {
              return -1;
          }
          return 0;
      }) :
       //descendente
       state.dogs.sort((a, b) => {
        let weightSplitA = a.weight.split('-')
        let weightA = weightSplitA[0]
        let weightSplitB = b.weight.split('-')
        let weightB = weightSplitB[0]
         if(!a.weight) weightA = 0
            if(!b.weight)  weightB = 0


        if(weightA > weightB) {
            return -1;
        }
        if(weightB > weightA) {
            return 1;
        }
        return 0;
    })
    return {
      ...state,
      dogs: arrByWeight
    };                   
      
    default:
       return {
        ...state
       }
  }
}
