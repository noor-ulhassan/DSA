import collections
import heapq

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:

        count = collections.Counter(nums)
     
        heap = []
    
        for num, freq in count.items():
      
            heapq.heappush(heap, (freq, num))
         
            if len(heap) > k:
                heapq.heappop(heap)
                
       
        result = []
        for freq, num in heap:
            result.append(num)
            
        return result