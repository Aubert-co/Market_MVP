import { ListComments } from "@/components/product/listComments";
import { render, screen } from "@testing-library/react";

describe("Component ListComments",()=>{
    it("should return an error message when the comments array is empty",()=>{
        const {queryByText,queryByTestId}= render(
            <ListComments comments={[]} reviews={[]}/>
        )

        expect(queryByText('Nenhum comentário disponível')).toBeInTheDocument()
        expect(queryByTestId("comments")).not.toBeInTheDocument()
          expect(queryByTestId("rating")).not.toBeInTheDocument()
    })
    it("should render comments and ratings correctly",()=>{
        const {queryByText,queryByTestId}= render(
            <ListComments comments={[{name:'jose',content:'lorem ipstu'}]} reviews={[{rating:5}]}/>
        )

        expect(queryByText('Nenhum comentário disponível')).not.toBeInTheDocument()
        expect(queryByTestId("comments")).toBeInTheDocument()
        expect(queryByText("j***")).toBeInTheDocument()
    
        expect(queryByTestId("rating")).toBeInTheDocument()
    })
    
})
