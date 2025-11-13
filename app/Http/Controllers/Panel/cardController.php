<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\CardRequest;
use App\Service\CardService;

class CardController extends Controller
{
    public $cardService;
    public function __construct()
    {
        $this->cardService = new CardService();
    }

    public function getAllCards()
    {
        $cards = $this->cardService->getAllCards();
        return response()->json($cards);
    }

    public function createCard(CardRequest $cardRequest)
    {
        $cardRequest->validated();
        $data = $cardRequest->only([
            'name',
            'status',
            'number',
            'validity',
            'cvv',
            'limit',
            'obs',  
        ]);

        $card = $this->cardService->createCard($data);
        return response()->json($card);
    }

    public function updateCard(CardRequest $cardRequest, $id)
    {
        $cardRequest->validated();
        $data = $cardRequest->only([
            'name',
            'status',
            'number',
            'validity',
            'cvv',
            'limit',
            'obs', 
        ]);
        
        $card = $this->cardService->updateCard($id, $data);
        return response()->json($card);
    }

    public function deleteCard($id)
    {
        $card = $this->cardService->deleteCard($id);
        return response()->json($card);
    }
}
