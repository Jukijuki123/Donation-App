<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    /**
     * GET /api/v1/donation
     * Retrieve all donations
     */
    public function index()
    {
        try {
            $donations = Donation::all();

            return response()->json([
                'message' => 'Retrieve all donations success',
                'data' => $donations
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error occurred'
            ], 500);
        }
    }

    /**
     * GET /api/v1/donation/{id}
     * Retrieve single donation
     */
    public function show($id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Donation not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Retrieve donation success',
            'data' => $donation
        ], 200);
    }

    /**
     * POST /api/v1/donation
     * Create new donation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string',
            'email'  => 'required|email',
            'amount' => 'required|integer'
        ]);

        $donation = Donation::create($validated);

        return response()->json([
            'message' => 'Donation created successfully',
            'data' => $donation
        ], 200);
    }

    /**
     * DELETE /api/v1/donation/{id}
     * Delete donation (Admin only)
     */
    public function destroy($id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Donation not found'
            ], 422);
        }

        $donation->delete();

        return response()->json([
            'message' => 'Donation deleted successfully'
        ], 200);
    }
}
