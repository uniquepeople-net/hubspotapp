<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts()
    {
        $hubspot = \HubSpot\Factory::createWithAccessToken(env('HUBSPOT_API_KEY'));
        
        
        try {
            $response = $hubspot->crm()->products()->basicApi()->getPage();
            $results = $response->getResults();
            
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteProduct($id)
    {
        $hubspot = \HubSpot\Factory::createWithAccessToken(env('HUBSPOT_API_KEY'));
        
        try {
            $hubspot->crm()->products()->basicApi()->archive($id);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createProduct(Request $request)
    {
        $hubspot = \HubSpot\Factory::createWithAccessToken(env('HUBSPOT_API_KEY'));
        
        try {
            $productInput = new \HubSpot\Client\Crm\Products\Model\SimplePublicObjectInput();
            $productInput->setProperties([
                'name' => $request->name,
                'price' => $request->price,
            ]);
            $hubspot->crm()->products()->basicApi()->create($productInput);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $hubspot = \HubSpot\Factory::createWithAccessToken(env('HUBSPOT_API_KEY'));
        
        try {
            $productInput = new \HubSpot\Client\Crm\Products\Model\SimplePublicObjectInput();
            $productInput->setProperties([
                'name' => $request->name,
                'price' => $request->price,
            ]);
            $hubspot->crm()->products()->basicApi()->update($id, $productInput);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function searchInProducts(Request $request){
        $params = $request->only(['name', 'id', 'price']);

        $hubspot = \HubSpot\Factory::createWithAccessToken(env('HUBSPOT_API_KEY'));

        $filters = [];

        try {
            foreach ($params as $paramName => $paramValue) {
                if ($paramValue !== null) {
                    $filters[] = (new \HubSpot\Client\Crm\Products\Model\Filter())
                        ->setOperator('EQ')
                        ->setPropertyName($paramName)
                        ->setValue($paramValue);
                }
            }
            
            $filterGroup = (new \HubSpot\Client\Crm\Products\Model\FilterGroup())
            ->setFilters($filters);
    
            $searchRequest = new \HubSpot\Client\Crm\Products\Model\PublicObjectSearchRequest();
            $searchRequest->setFilterGroups([$filterGroup]);
    
            // Get specific properties
            $searchRequest->setProperties(['name', 'id', 'price']);
    
            // @var CollectionResponseWithTotalSimplePublicObject $contactsPage
            $response = $hubspot->crm()->products()->searchApi()->doSearch($searchRequest);
            $results = $response->getResults();
                
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}

