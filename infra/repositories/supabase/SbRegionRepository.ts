import { RegionRepository } from '@/domain/repositories/RegionRepository';
import { supabase } from './Sbclient';
import { Region } from '@/domain/entities/Region';

export const SbRegionRepository = (): RegionRepository => ({
  async getAllRegions() {
    const { data, error } = await supabase
      .from('region')
      .select('*')
      .order('name', { ascending: true });
    
    if (error || !data) return null;

    const formatted : Region[] = data.map((region) => ({
      region_id: region.region_id,
      name: region.name,
      lat: region.lat,
      lon: region.lon,
    }));

    return formatted;
  },

  async getCoordsByName(name) {
    const { data, error } = await supabase
      .from('region')
      .select('*')
      .eq('name', name)
      .single();
    
    if (error || !data) return null;
    
    return {
      region_id: data.region_id,
      name: data.name,
      lat: data.lat,
      lon: data.lon,
    }

  },
});