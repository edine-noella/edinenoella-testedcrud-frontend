import transactionssStore from "../../src/store/transactionsStore";
import { getAllTransactions, updateTransactions, addTransactions, deleteTransactions} from '../../src/actions/transactions.js';
import { range } from "lodash";
describe('Testmonial store', () => {


    it('Initial State test', () => {
        // Response body sample
        const initialState = [
            {
                id: 1,
                MeterNumber: "123456",
                currentElectricityToken:"12345678" ,
                remainingDays: 5,
               
            },
            {
                id: 2,
                MeterNumber: "123400",
                currentElectricityToken:"12345600",
                remainingDays: 5,
               
            }
        ]
        
        expect(transactionssStore.getState()).toEqual(initialState)
    })

    it("add transactionss test", async () => {
        const newTestimony =    {
                id: 3,
                MeterNumber: "866544",
                currentElectricityToken: "23456187",
                remainingDays: 5,
               
            }
        

        const initialLength = transactionssStore.getState().length  // number of transactionss before addition
        
        await transactionssStore.dispatch(addTransactions(newTestimony))

        expect(transactionssStore.getState().length).toBeGreaterThan(initialLength)
        
        expect(transactionssStore.getState()[2].MeterNumber).toEqual(newTestimony.MeterNumber)
    })

    it("like transactionss", async () =>{
        const transactionsToLike = transactionssStore.getState()[0]

        await transactionssStore.dispatch(liketransactions(transactionsToLike))

        expect(transactionssStore.getState()[0].likes).toBeGreaterThan(transactionsToLike.likes)
        
    })

    it('Update testmonial test', async () => {
        // Response body sample
        const stateToUpdate = {
            id: 2,
            MeterNumber: "123445",
            currentElectricityToken: "9847528",
            remainingDays: 4,
            
        }
        
        await transactionssStore.dispatch(updateTransactions(stateToUpdate))
        expect(transactionssStore.getState()[1].MeterNumber).toEqual(stateToUpdate.MeterNumber)
    })

    
    it('Update Unexisting testmonial test', async () => {
        // Response body sample
        const stateToUpdate = {
            id: 4,
            MeterNumber: "235457",
            currentElectricityToken: "986792",
            remainingDays: "9",
           
        }
        
        await transactionssStore.dispatch(updateTransactions(stateToUpdate))
        expect(transactionssStore.getState()[1]).not.toEqual(stateToUpdate)
    })
    
    it('View testmonial test', async () => {
        // Response body sample
        
        const initialState = transactionssStore.getState()
        let views = initialState[0].views
        await transactionssStore.dispatch(getAllTransactions())
        expect(transactionssStore.getState()[0].views).toEqual(views+1)
        ++views 

        for(const i in range(40))
            await transactionssStore.dispatch(getAllTransactions())
        
        expect(transactionssStore.getState()[0].views).toEqual(views + 40)
    })

    it('Dislike testmonial test', async () => {
        // Response body sample
        
        const testMonialToReact = {
            id: 2,
            currentElectricityToken: 1,
        }

        const likes = 40
        for(const i in range(likes))
        await transactionssStore.dispatch(liketransactions(testMonialToReact))
        
        const dislikes = 20
        for(const i in range(dislikes))
            transactionssStore.dispatch(disliketransactions(testMonialToReact))

        expect(transactionssStore.getState()[1].dislikes).toEqual(likes - dislikes)
    })
    it("delete transactionss", async () => {

        const initialLength = transactionssStore.getState().length

        await transactionssStore.dispatch(deleteTransactions(transactionssStore.getState()[1]))

        expect(transactionssStore.getState().length).toBeLessThan(initialLength)
    })

})