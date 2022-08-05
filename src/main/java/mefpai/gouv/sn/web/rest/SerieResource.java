package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Serie;
import mefpai.gouv.sn.repository.SerieRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.SerieService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Serie}.
 */
@RestController
@RequestMapping("/api")
public class SerieResource {

    private final Logger log = LoggerFactory.getLogger(SerieResource.class);

    private static final String ENTITY_NAME = "serie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SerieService serieService;

    private final SerieRepository serieRepository;

    public SerieResource(SerieService serieService, SerieRepository serieRepository) {
        this.serieService = serieService;
        this.serieRepository = serieRepository;
    }

    /**
     * {@code POST  /series} : Create a new serie.
     *
     * @param serie the serie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serie, or with status {@code 400 (Bad Request)} if the serie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/series")
    public ResponseEntity<Serie> createSerie(@Valid @RequestBody Serie serie) throws URISyntaxException {
        log.debug("REST request to save Serie : {}", serie);
        if (serie.getId() != null) {
            throw new BadRequestAlertException("A new serie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Serie result = serieService.save(serie);
        return ResponseEntity
            .created(new URI("/api/series/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /series/:id} : Updates an existing serie.
     *
     * @param id the id of the serie to save.
     * @param serie the serie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serie,
     * or with status {@code 400 (Bad Request)} if the serie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/series/{id}")
    public ResponseEntity<Serie> updateSerie(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Serie serie)
        throws URISyntaxException {
        log.debug("REST request to update Serie : {}, {}", id, serie);
        if (serie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Serie result = serieService.save(serie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /series/:id} : Partial updates given fields of an existing serie, field will ignore if it is null
     *
     * @param id the id of the serie to save.
     * @param serie the serie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serie,
     * or with status {@code 400 (Bad Request)} if the serie is not valid,
     * or with status {@code 404 (Not Found)} if the serie is not found,
     * or with status {@code 500 (Internal Server Error)} if the serie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/series/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Serie> partialUpdateSerie(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Serie serie
    ) throws URISyntaxException {
        log.debug("REST request to partial update Serie partially : {}, {}", id, serie);
        if (serie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Serie> result = serieService.partialUpdate(serie);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serie.getId().toString())
        );
    }

    /**
     * {@code GET  /series} : get all the series.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of series in body.
     */
    @GetMapping("/series")
    public ResponseEntity<List<Serie>> getAllSeries(Pageable pageable) {
        log.debug("REST request to get a page of Series");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Serie> page = serieService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (serieService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((serieRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /series/:id} : get the "id" serie.
     *
     * @param id the id of the serie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/series/{id}")
    public ResponseEntity<Serie> getSerie(@PathVariable Long id) {
        log.debug("REST request to get Serie : {}", id);
        Optional<Serie> serie = serieService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serie);
    }

    /**
     * {@code DELETE  /series/:id} : delete the "id" serie.
     *
     * @param id the id of the serie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/series/{id}")
    public ResponseEntity<Void> deleteSerie(@PathVariable Long id) {
        log.debug("REST request to delete Serie : {}", id);
        serieService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
