class Api::CardsController < ApplicationController
  def index
    @cards = Card.all
    render json: @cards
  end

  private
  def card_params
    params.require(:card).permit(:title, :content)
  end
end
