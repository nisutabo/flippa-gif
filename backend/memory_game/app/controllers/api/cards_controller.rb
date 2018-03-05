class Api::CardsController < ApplicationController
  def index
    @cards = Card.all
    render json: @cards
  end

  private
  def card_params
    params.permit(:title, :content)
  end
end
